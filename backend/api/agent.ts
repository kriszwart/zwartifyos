import { mainAgent } from "../agents/mainAgent"

export default async function handler(req, res) {
  try {
    const { input } = req.body
    const result = await mainAgent(input)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: "Agent error" })
  }
}

