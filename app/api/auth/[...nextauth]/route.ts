import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/databse";

import User from "@models/user";

const {
    GOOGLE_ID,
    GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET
} = process.env

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    secret: NEXTAUTH_SECRET,
    callbacks: {
        async session({session}: any){
            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}: any){
            try {
                await connectToDB();

                // Check if user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                // if not create new user
                if(!userExists){
                    await User.create({
                        email: profile.email, 
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error: any) {
                console.log(error)
                return false;
            }
        }
    }

})

export {handler as GET, handler as POST}