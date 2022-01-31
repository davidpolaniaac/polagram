import * as admin from "firebase-admin";
import * as express from "express";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const auth = admin.auth();

interface IRequests extends express.Request {
  user: {
    uid: string;
    email: string;
    role: string;
  };
}
export default () => {
  const app = express();

  app.use(async (req, res, next) => {
    const token = req.headers.authorization as string;
    try {
      const { uid, email } = await auth.verifyIdToken(token);
      const snap = await db.collection("users").doc(uid).get();
      const user = snap.data();

      Object.assign(req, {
        user: {
          ...user,
          uid,
          email,
        },
      });
      next();
    } catch (error) {
      res.status(403).send("Authorization error");
    }
  });

  app.get("/api/posts/:postId/like", async (req: IRequests, res: any) => {
    const { uid } = req.user;
    const { postId } = req.params;

    const snaps = await db
      .collection("like")
      .where("userId", "==", uid)
      .where("postId", "==", postId)
      .limit(1)
      .get();

    const result: { id?: string} = {}
    snaps.forEach(x => Object.assign(result, {...x.data(), id: x.id}))
    if(result.id){
      await db.collection('like').doc(result.id).delete();
    }
    if(!result.id){
      await db.collection('like').doc().set({
        userId: uid,
        postId,
        createAt: new Date()
      })
    }
    res.sendStatus(204);
  });

  app.get("/api/posts/:postId/share", async (req: IRequests, res: any) => {
    const { uid } = req.user;
    const { postId } = req.params;

    const snap = await db.collection('posts').doc(postId).get()
    const post = snap.data();
    const result = await db.collection('posts').add({
      ...post,
      userId: uid
    })

    res.send({ id: result.id});
  });

  return app;
};
