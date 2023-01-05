import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class FlexModel extends ItemsComponentModel {

  checkIfResetOnRevisit() {
    this.resetActiveItems();
    super.checkIfResetOnRevisit();
    this.toggleItemsState(0);
  }

  toggleItemsState(index) {
    const item = this.getItem(index);
    const previousActiveItem = this.getActiveItem();

    item.toggleActive();
    item.toggleVisited(true);

    if (!previousActiveItem) return;
    previousActiveItem.toggleActive(false);
  }

}
