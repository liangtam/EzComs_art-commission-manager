import Line from "../line/Line";

const CommissionSummary = ({ data }) => {
    return (
        <div className="flex-col gap-2 radius-2 pad-4 marb-3 w-50" style={{ boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex-col">
                <p>Total number of commissions:</p>
                <p className="font-size-5">{data.numOfCommissions}</p>
            </div>
            <Line />
            <div className="flex-col">
                <p>This month's number of commissions:</p>
                <p className="font-size-5">{data.monthlyNumOfCommissions}</p>
            </div>
        </div>
    );
};

export default CommissionSummary;