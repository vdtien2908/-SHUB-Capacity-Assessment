const QueryService = require('../../services/query.service');
const { SuccessResponse } = require('../../core/success.response');

class QueryController {
    static async handleGetData(req, res) {
        const dataObj = await QueryService.fetchData();
        const results = QueryService.processQueries(dataObj);
        await QueryService.sendResults(dataObj.token, results);

        new SuccessResponse({
            message: 'Results sent successfully',
            metaData: { results },
        }).send(res);
    }
}

module.exports = QueryController;
