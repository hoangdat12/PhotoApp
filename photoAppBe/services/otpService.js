import client from "../helper/connectRedis.js"

export const verifyOtpService = async (email, otp) => {
    return new Promise((resolve, reject) => {
        client.get(email, (err, reply) => {
            if (err) reject(err)
            else resolve(JSON.parse(reply))
        })
    })
}