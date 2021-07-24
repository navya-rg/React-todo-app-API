module.exports = function ListService() {
    const service = this;

    service.getAllLists = function() {
        return ['list1', 'list2', 'list3'];
    }
}
