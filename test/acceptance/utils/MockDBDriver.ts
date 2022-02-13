import { IRepositoryDriver } from "@nc/utils/types";

export class MockDBDriver implements IRepositoryDriver {
    private returnData: any[];
    setReturnData(returnData: any[]) {
        this.returnData = returnData;
    }

    query(queryString: string, parameters?: any) {
        return { rows: this.returnData };
    }
}