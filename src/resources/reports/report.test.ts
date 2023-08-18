import Reports from "./report";
import { Projects } from "../projects/project";
import { Report } from "./types";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

describe("Reports Instance", () => {
    const reports = new Reports({
        apiKey: apiKey,
        baseUrl: baseUrl
    });

    let reportId: string;

    it("should be instance of Reports", () => {
        expect(reports).toBeInstanceOf(Reports);
    });


    it("should throw error if invalid project id provided", async () => {
        await expect( reports.getAllByProjectId("123")).rejects.toThrowError("Forbidden");
    })

    it("should return reports by project id", async () => {
        // Projects instance
        const projectClient = new Projects({
            apiKey: apiKey,
            baseUrl: baseUrl
        });

        // Get all projects
        const projects = await projectClient.getAll();

        // Get first project id from projects
        const projectId = projects?.payload?.[0]?.id;

        // Get reports by project id
        const report = await reports.getAllByProjectId(projectId);

         reportId = report?.payload?.[0]?.id

        expect(report.payload?.[0]?.projectId).toEqual(projectId);
    });

    it("should throw error if id is not provided", () => {
        expect(() => {
            reports.getById("");
        }).toThrowError("No id provided");
    });

    it("should throw error if invalid report id is provided", async () => {
        await expect( reports.getById("123")).rejects.toThrowError("Forbidden");
    })

    it("should return report by id", async () => {
        const report = await reports.getById(reportId);

        expect(report.payload?.id).toEqual(reportId);

    })
});
