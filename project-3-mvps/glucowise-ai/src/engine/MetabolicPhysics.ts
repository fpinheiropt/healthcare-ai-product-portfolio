// GlucoWise Metabolic Physics 🛡️
// Deterministic logic to predict glucose spikes based on carb physics

export interface MealInput {
    carbsGrams: number;
    proteinGrams: number;
    fiberGrams: number;
    preMealGlucose: number;
}

export type RiskLevel = 'STABLE' | 'MODERATE_SPIKE' | 'SEVERE_SPIKE';

export class MetabolicPhysics {

    static predictSpikeRisk(meal: MealInput): { level: RiskLevel; reason: string } {
        // Warning: Very High Pre-Meal Glucose
        if (meal.preMealGlucose > 250) {
            return { level: 'SEVERE_SPIKE', reason: 'Pre-meal hyperglycemia (>250 mg/dL). Avoid high carbs.' };
        }

        // Rule: Carbs > 75g usually causes severe spikes
        if (meal.carbsGrams > 75) {
            const mitigation = meal.fiberGrams > 10 ? ' (mitigated by fiber)' : '';
            if (meal.fiberGrams > 10) {
                return { level: 'MODERATE_SPIKE', reason: 'High carb load partially buffered by fiber.' };
            }
            return { level: 'SEVERE_SPIKE', reason: 'High carb load (>75g) without sufficient fiber.' };
        }

        // Rule: Moderate Carbs (40-75g)
        if (meal.carbsGrams > 40) {
            return { level: 'MODERATE_SPIKE', reason: 'Moderate carbohydrate load.' };
        }

        return { level: 'STABLE', reason: 'Low glycemic load.' };
    }
}
