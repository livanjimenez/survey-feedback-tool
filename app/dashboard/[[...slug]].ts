import { GetServerSidePropsContext } from "next";
import admin from "../firebase/firebaseAdmin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionCookie = context.req.cookies.__session || "";
  const user = await verifySession(sessionCookie);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

async function verifySession(sessionCookie: string) {
  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error("Session cookie verification failed:", error);
    return null;
  }
}
