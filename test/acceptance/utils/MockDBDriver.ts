import { IRepositoryDriver } from "@nc/utils/types";

export class MockDBDriver implements IRepositoryDriver {
    private returnData: any[];
    setReturnData(returnData: any[]) {
        this.returnData = returnData;
    }

    async query(queryString: string, parameters?: any): Promise<any> {
        return { rows: this.returnData };
    }
}