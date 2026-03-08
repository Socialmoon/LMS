/**
 * Firebase Seed Script
 * --------------------
 * Seeds Firebase Authentication and Firestore with data from db.json.
 *
 * Prerequisites:
 *   1. Go to Firebase Console → Project Settings → Service Accounts
 *   2. Click "Generate new private key" and save as:
 *        scripts/serviceAccountKey.json
 *   3. Run: node scripts/seed-firebase.js
 */

const admin = require("firebase-admin");
const path = require("path");
const db = require("../pages/api/db.json");

// Load service account key
let serviceAccount;
try {
  serviceAccount = require("./serviceAccountKey.json");
} catch {
  console.error(
    "\n❌ Service account key not found.\n" +
    "   1. Go to Firebase Console → Project Settings → Service Accounts\n" +
    "   2. Click 'Generate new private key'\n" +
    "   3. Save the file as: scripts/serviceAccountKey.json\n" +
    "   Then re-run: node scripts/seed-firebase.js\n"
  );
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const auth = admin.auth();

async function seedUsers() {
  console.log("\n👤 Seeding users into Firebase Auth + Firestore...");

  for (const user of db.users) {
    try {
      // Create in Firebase Authentication
      let authUser;
      try {
        authUser = await auth.createUser({
          email: user.email,
          password: user.password,
          displayName: user.name,
          disabled: user.status !== "active",
        });
        console.log(`  ✅ Auth created: ${user.email}`);
      } catch (err) {
        if (err.code === "auth/email-already-exists") {
          authUser = await auth.getUserByEmail(user.email);
          console.log(`  ⚠️  Auth already exists (skipped): ${user.email}`);
        } else {
          throw err;
        }
      }

      // Store profile in Firestore (users collection), keyed by auth UID
      const { password, ...profileData } = user;
      await firestore.collection("users").doc(authUser.uid).set({
        ...profileData,
        uid: authUser.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`  ✅ Firestore profile saved: ${user.email}`);
    } catch (err) {
      console.error(`  ❌ Failed for ${user.email}:`, err.message);
    }
  }
}

async function seedCollection(collectionName, items) {
  console.log(`\n📦 Seeding '${collectionName}' (${items.length} records)...`);
  const batch = firestore.batch();

  for (const item of items) {
    const ref = firestore.collection(collectionName).doc(String(item.id));
    batch.set(ref, {
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  console.log(`  ✅ ${items.length} records written to '${collectionName}'`);
}

async function main() {
  console.log("🔥 Starting Firebase seed...");

  await seedUsers();
  await seedCollection("courses", db.courses);
  await seedCollection("payments", db.payments);
  await seedCollection("instructors", db.instructors);
  await seedCollection("subscriptions", db.subscriptions);

  // Seed singleton dashboard stats document
  console.log("\n📊 Seeding dashboard stats...");
  await firestore.collection("config").doc("dashboardStats").set(db.dashboardStats);
  console.log("  ✅ Dashboard stats saved");

  console.log("\n🎉 Seed complete!\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
