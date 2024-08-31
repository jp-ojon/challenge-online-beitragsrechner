// Retry function that would return based on the number of "retries", with "delay" for every retry
export async function retryOperation<T>(operation: () => Promise<T>, retries: number = 5, delay: number = 1000): Promise<T> {
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            if (attempt >= retries) {
                throw new Error(`Operation failed after ${retries} attempts: ${error}`);
            }
            console.log(`Retry ${attempt} of ${retries} after ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Retry mechanism failed unexpectedly.');
}