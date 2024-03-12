import Line from '../line/Line';

const IncomeSummary = ({ monthlyIncome, totalIncome }) => {
    return (
        <div className="flex-col gap-2 radius-2 pad-2" style={{ boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>
            <div className="flex-col">
                <p>Total Income:</p>
                <p className="font-size-3">{`$${totalIncome.toFixed(2)}`}</p>
            </div>
            <Line />
            <div className="flex-col">
                <p>This month's income:</p>
                <p className="font-size-3">{`$${monthlyIncome.toFixed(2)}`}</p>
            </div>
        </div>
    );
};

export default IncomeSummary;
