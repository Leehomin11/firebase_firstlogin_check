async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await db.collection("users").doc(user.uid).get();
    // 처음 로그인 확인
    if (!userDoc.exists) {
      await db.collection("users").doc(user.uid).set({
        firstLogin: firebase.firestore.FieldValue.serverTimestamp(),
      });
      alert("Welcome! This is your first login."); // 처음 로그인 시
    } else {
      alert("Welcome back!"); // 처음 로그인이 아닐시
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    alert("Login failed: " + error.message);
  }
}
