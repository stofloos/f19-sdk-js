import Reports from "./";
import Projects from "../projects";
import "isomorphic-fetch";

const apiKey = process.env.F19_API_KEY!;
const baseUrl = process.env.F19_BASE_URL!;

const config = {
    apiKey,
    baseUrl
};

describe("Reports resource", () => {
    const reports = new Reports(config);

    let reportId: string;
    let customReportId: string;
    let componentId: string;

    it("should be instance of Reports", () => {
        expect(reports).toBeInstanceOf(Reports);
    });

    it("should throw error if invalid project id provided", async () => {
        await expect(reports.getAllByProjectId("123")).rejects.toThrowError(
            "Forbidden"
        );
    });

    it("should return reports by project id", async () => {
        // Projects instance
        const projectClient = new Projects(config);

        // Get all projects
        const projects = await projectClient.getAll();

        // Get first project id from projects
        const projectId = projects?.payload?.[0]?.id;

        // Get reports by project id
        const report = await reports.getAllByProjectId(projectId);

        reportId = report?.payload?.[0]?.id;
        componentId = report?.payload?.[0]?.components?.[0]?.id;

        expect(report).toHaveProperty("payload");
        expect(report.payload).toBeInstanceOf(Array);
    });

    it("should throw error if id is not provided", async () => {
        await expect(reports.getById("")).rejects.toThrowError(
            "No id provided"
        );
    });

    it("should throw error if invalid report id is provided", async () => {
        await expect(reports.getById("123")).rejects.toThrowError("Forbidden");
    });

    it("should return report by id", async () => {
        const report = await reports.getById(reportId);

        expect(report.payload?.id).toEqual(reportId);
    });



    describe("Custom reports", () => {
        it("should throw error if invalid report id is provided", async () => {
            await expect(reports.getReportProgress("")).rejects.toThrowError(
                "No id provided"
            );
        });

        it("should throw error if invalid report id is provided", async () => {
            await expect(
                reports.getReportProgress("123")
            ).rejects.toThrowError("Not Found");

        });

        it.skip("should return custom report progress", async () => {
            const report = await reports.getReportProgress(customReportId);

            expect(report.payload?.id).toEqual(customReportId);

        });


        it("should throw error if invalid report id is provided", async () => {
            await expect(reports.createCustomReport("")).rejects.toThrowError(
                "No id provided"
            );
        });

        it("should throw error if invalid report id is provided", async () => {
            await expect(
                reports.createCustomReport("123")
            ).rejects.toThrowError("Bad Request");
        });

        it.skip("should create custom report", async () => {
            const report = await reports.createCustomReport(customReportId, "chpdf", [
                componentId
            ]);

            expect(report.payload?.id).toEqual(reportId);
        });

    });

    describe("Custom async reports", () => {
        it("should should throw error if invalid report id is provided ", () => {
            expect(reports.createCustomAsyncReport("")).rejects.toThrowError(
                "No id provided"
            );
        });

        it("should throw error if invalid report id is provided", async () => {
            await expect(
                reports.createCustomAsyncReport("123")
            ).rejects.toThrowError("Bad Request");
        });


        it.skip("should create custom async report", async () => {
            const report = await reports.createCustomAsyncReport(customReportId, "chpdf", [
                componentId
            ]);

            expect(report.payload?.id).toEqual(customReportId);
        });

    });
});
