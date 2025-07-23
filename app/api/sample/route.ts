import { NextResponse } from "next/server"
import fs, { writeFileSync } from "fs"
import { parse } from "csv-parse/sync"

export async function GET() {
	const client_path = "app/api/sample/client.csv"
	const task_path = "app/api/sample/tasks.csv"
	const worker_path = "app/api/sample/workers.csv"
	const filePath = "app/api/data.json"
	try {
		const client_csv = fs.readFileSync(client_path, "utf-8")
		const task_csv = fs.readFileSync(task_path, "utf-8")
		const worker_csv = fs.readFileSync(worker_path, "utf-8")
                const data = {
                        clients:[],
                        workers:[],
                        tasks:[]


                }

		data.clients = parse(client_csv, {
			columns: true,
			skip_empty_lines: true,
		})
		data.workers = parse(worker_csv, {
			columns: true,
			skip_empty_lines: true,
		})
		data.tasks = parse(task_csv, {
			columns: true,
			skip_empty_lines: true,
		})
		writeFileSync(filePath, JSON.stringify(data, null, 2))
		return NextResponse.json({ data })
	} catch (e) {
		console.log(e)
		return NextResponse.json({ error: "request failed" })
	}
}
