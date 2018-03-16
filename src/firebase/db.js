import { db, auth } from "./firebase";

export const topicsRef = () => {
  const user = auth.currentUser;
  if (user == null) {
    return null
  } else if (user != null) {
    const { uid } = user;
    return db.collection("users").doc(uid).collection("topics");
  }
}

export const papersRef = () => {
  const user = auth.currentUser;
  if (user == null) {
    return null
  } else if (user != null) {
    const { uid } = user;
    return db.collection("users").doc(uid).collection("papers");
  }
}

export const pilesRef = () => {
  const user = auth.currentUser;
  if (user == null) {
    return null
  } else if (user != null) {
    const { uid } = user;
    return db.collection("users").doc(uid).collection("piles");
  }
}

export const evalsRef = () => {
  const user = auth.currentUser;
  if (user == null) {
    return null
  } else if (user != null) {
    const { uid } = user;
    return db.collection("users").doc(uid).collection("evals");
  }
}

export const commentsRef = () => {
  const user = auth.currentUser;
  if (user == null) {
    return null
  } else if (user != null) {
    const { uid } = user;
    return db.collection("users").doc(uid).collection("comments");
  }
}

export const studentsRef = () => {
  const user = auth.currentUser;
  if (user == null) {
    return null
  } else if (user != null) {
    const { uid } = user;
    return db.collection("users").doc(uid).collection("students");
  }
}

const DEFAULT_USER = (name, matter) => ({
  profile: {
    name,
    matter,
    "birthday": 519948000000,
    "emailNotifications": true,
    "phoneNotifications": true
  }
});

export { DEFAULT_USER };

export const setDefaultUserIfEmpty = (user, matter, username) => {
  const { uid } = user;
  db.collection("users").doc(uid).get().then(doc => {
    if (!doc.exists) {
      db.collection("users").doc(uid).set(DEFAULT_USER(username, matter));
      console.log("Utilisateur créé");
    } else {
      console.log("Oups, tout se passe comme si on n'était pas seuls.");
    }
  });
  user.updateProfile({ displayName: username });
};

export const fillThoseEvals = container => {
  container.forEach(item => {
    const user = auth.currentUser;
    const { uid } = user;
    const id = item.id;
    db
      .collection("users")
      .doc(uid)
      .collection("evals")
      .doc(id)
      .set(item)
      .then(ref => {
        console.log("eval ajoutée");
      });
  });
};

export const fillEvals = () => {
  let container = [];
  db
    .collection("seeds")
    .doc("philosophie")
    .collection("evals")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let newdoc = doc.data();
        newdoc.id = doc.id;
        container.push(newdoc);
      });
      console.log("from firebase, evals container", container.length);
      this.fillThoseEvals(container);
    });
};

export const fillThoseComments = container => {
  container.forEach(item => {
    const user = auth.currentUser;
    const { uid } = user;
    const id = item.id;
    db
      .collection("users")
      .doc(uid)
      .collection("comments")
      .doc(id)
      .set(item)
      .then(ref => {
        console.log("com ajouté");
      });
  });
};

export const fillComments = () => {
  let container = [];
  db
    .collection("seeds")
    .doc("philosophie")
    .collection("comments")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let newdoc = doc.data();
        newdoc.id = doc.id;
        container.push(newdoc);
      });
      console.log("from firebase, comments container", container.length);
      this.fillThoseComments(container);
    });
};
