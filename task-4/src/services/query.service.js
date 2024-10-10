const axios = require('axios');

class QueryService {
    static async fetchData() {
        const { data } = await axios.get(
            'https://test-share.shub.edu.vn/api/intern-test/input'
        );
        return data;
    }

    static async sendResults(token, results) {
        await axios.post(
            'https://test-share.shub.edu.vn/api/intern-test/output',
            { result: results },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    }

    static calculatePrefixSums(data) {
        const n = data.length;
        const prefixSum = new Array(n).fill(0);
        const alternatingSum = new Array(n).fill(0);

        prefixSum[0] = data[0];
        alternatingSum[0] = data[0];

        for (let i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + data[i];
            alternatingSum[i] =
                alternatingSum[i - 1] + (i % 2 === 0 ? data[i] : -data[i]);
        }

        return { prefixSum, alternatingSum };
    }

    static processQueries({ data, query }) {
        const { prefixSum, alternatingSum } = this.calculatePrefixSums(data);
        const results = [];

        query.forEach((q) => {
            const { type, range } = q;
            const [l, r] = range;

            if (type === '1') {
                const sum =
                    l === 0 ? prefixSum[r] : prefixSum[r] - prefixSum[l - 1];
                results.push(sum);
            } else if (type === '2') {
                const sum =
                    l === 0
                        ? alternatingSum[r]
                        : alternatingSum[r] - alternatingSum[l - 1];
                results.push(sum);
            }
        });

        return results;
    }
}

module.exports = QueryService;
