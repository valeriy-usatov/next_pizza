import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: UserRole;
      name?: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    fullName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    fullName?: string;
    role: UserRole;
  }
}
