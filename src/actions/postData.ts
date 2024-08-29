import axios from "axios";
import { getUser } from "./userData";

const userCache = {};
const fetchPromises = {};

export const getPosts = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`);
        const posts = response.data;

        const postsWithUserData = await Promise.all(
            posts.map(async (post) => {
                let userData;

                if (userCache[post.userUid]) {
                    userData = userCache[post.userUid];
                } else if (fetchPromises[post.userUid]) {
                    userData = await fetchPromises[post.userUid];
                } else {
                    fetchPromises[post.userUid] = getUser(post.userUid);
                    userData = await fetchPromises[post.userUid];
                    userCache[post.userUid] = userData;
                    delete fetchPromises[post.userUid];
                }

                return {
                    ...post,
                    fullName: userData?.fullName || "Unknown User",
                    userName: userData?.userName || "Unknown User",
                    email: userData?.email || "Unknown User",
                };
            })
        );

        return postsWithUserData;
    } catch (error) {
        console.log(error);
        return error;
    }
};
