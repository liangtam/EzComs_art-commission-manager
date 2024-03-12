import Line from '../line/Line';

const IncomeSummary = ({ monthlyIncome, totalIncome }) => {
    return (
        <div className="flex-col gap-2 radius-2 pad-4 marb-3 w-50" style={{ boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex-col">
                <p>Total Income:</p>
                <p className="font-size-5">{`$${totalIncome.toFixed(2)}`}</p>
            </div>
            <Line />
            <div className="flex-col">
                <p>This month's income:</p>
                <p className="font-size-5">{`$${monthlyIncome.toFixed(2)}`}</p>
            </div>
        </div>
    );
};

export default IncomeSummary;
