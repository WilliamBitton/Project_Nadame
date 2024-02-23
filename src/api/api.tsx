import { ProjectData, UserData, UserLoginData, ContactData } from "@/interface/interface";
import { NextResponse } from "next/server";
const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null;

// AUTH
export async function postSignUp(formData: UserData) {
  const res = await fetch(`https://api-admin-template-free.onrender.com/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la création de données");
    } else {
      throw new Error("Échec de la création de données");
    }
  }
  return res.json();
}

export async function postLogin(formData: UserLoginData) {
  const res = await fetch(`https://api-admin-template-free.onrender.com/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Échec de la connexion");
  }
  return res.json();
}

// USERS
export async function getUsers() {
  const res = await fetch(`https://api-admin-template-free.onrender.com/users`, {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
      'Authorization': `Bearer ${token}`
    },
  }
  );
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la récupération de données")
    } else {
      throw new Error("Échec de la récupération de données");
    }
  }
  return res.json();
}

export async function getUser(userId: string) {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        'Authorization': `Bearer ${token}`
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la récupération de données")
    } else {
      throw new Error("Échec de la récupération de données");
    }
  }
  return res.json();
}

export async function getUserProfile() {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/user/profile`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        'Authorization': `Bearer ${token}`
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la récupération de données")
    } else {
      throw new Error("Échec de la récupération de données");
    }
  }
  return res.json();
}

export async function putUser(userId: string, formData: UserData) {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/user/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la modication de données")
    } else {
      throw new Error("Échec de la modication de données");
    }
  }
  return res.json();
}

export async function deleteUser(userId: string) {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/user/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        'Authorization': `Bearer ${token}`
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la suppression de données")
    } else {
      throw new Error("Échec de la suppression de données");
    }
  }
}

//PROJECTS
export async function getProjects() {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/projects`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Échec de la récupération des données");
  }
  return res.json();
}

export async function getProject(projectId: string) {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/project/${projectId}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Échec de la récupération des données");
  }
  return res.json();
}

export async function postProject(formData: ProjectData) {
  const res = await fetch(`https://api-admin-template-free.onrender.com/project`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la création de données")
    } else {
      throw new Error("Échec de la création de données");
    }
  }
  return res.json();
}

export async function putProject(projectId: string, formData: ProjectData) {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/project/${projectId}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la modification de données")
    } else {
      throw new Error("Échec de la modification de données");
    }
  }
  return res.json();
}

export async function deleteProject(projectId: string) {
  const res = await fetch(
    `https://api-admin-template-free.onrender.com/project/${projectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        'Authorization': `Bearer ${token}`
      },
    }
  );

  if (!res.ok) {
    if (res.status === 401) {
      window.location.replace("/private/admin-panel/login");
      throw new Error("Échec de la suppression de données")
    } else {
      throw new Error("Échec de la suppression de données");
    }
  }
}

// CONTACT
export async function postContact(formData: ContactData) {
  const res = await fetch(`https://api-admin-template-free.onrender.com/contact`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Échec de l'envoi des données");
  }
  return NextResponse.json({ data: formData }, { status: 200 });
}

// INFOLETTRE
export async function postInfolettre(formData: String) {
  const res = await fetch(`https://api-admin-template-free.onrender.com/infolettre`, {
    method: "POST",
    body: JSON.stringify({ email: formData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Échec de l'envoi des données");
  }
  return res.json();
}