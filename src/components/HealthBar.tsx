export default function HealthBar({ maxHealth, currentHealth }: { maxHealth: number, currentHealth: number }) {
    const criticalHealth = maxHealth * 0.10;
    const lowHealth = maxHealth * 0.25;
    const warningHealth = maxHealth * 0.5;
    const goodHealth = maxHealth * 0.75;

    const healthColor = (health: number) => {
        if (health <= criticalHealth) {
            return 'bg-red-700';
        } else if (health <= lowHealth) {
            return 'bg-red-500';
        } else if (health <= warningHealth) {
            return 'bg-orange-500';
        } else if (health <= goodHealth) {
            return 'bg-lime-500';
        } else {
            return 'bg-green-600';
        }
    };
    return (
        <div>
            <div className='h-4 w-full bg-gray-500 rounded border border-gray-800 overflow-hidden relative'>
                <div className={`h-full ${healthColor(currentHealth)}`} style={Object.assign({}, {width: `${(currentHealth / maxHealth) * 100}%`})}></div>
            </div>
            <div className='text-2xs font-bold'>{currentHealth} / {maxHealth}</div>
        </div>
    );
}
