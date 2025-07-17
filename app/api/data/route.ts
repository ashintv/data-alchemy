import { NextRequest, NextResponse } from "next/server"

const data = {
	clients: [],
	workers: [],
	tasks: [],
}
import { readFileSync, writeFileSync } from "fs"

//
export async function POST(req: NextRequest, res: NextResponse) {
	const filePath = "app/api/data.json"
	try {
		const body = await req.json()
		console.log("Received data: hitted ")
		const formData = body.formData
		if (!formData) {
			return new Response("No file uploaded", { status: 400 })
		}
		data.clients = formData.clients
		data.workers = formData.workers
		data.tasks = formData.tasks
		writeFileSync(filePath, JSON.stringify(data, null, 2))
		console.log("Data saved successfully")
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.error("Error processing file upload:", error)
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
	}
}

export async function GET() {
	const filePath = "app/api/data.json"
	const data = JSON.parse(readFileSync(filePath, "utf-8"))
	return NextResponse.json({ clients: data.clients, workers: data.workers, tasks: data.tasks }, { status: 200 })
}

