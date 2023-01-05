import ComponentView from 'core/js/views/componentView';

class FlexView extends ComponentView {

  preRender() {
    this.onClick = this.onClick.bind(this);
  }

  postRender() {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });
    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  onClick(event) {
    this.model.toggleItemsState($(event.currentTarget).parents('.js-flex-item').data('index'));
  }

}

FlexView.template = 'flex.jsx';

export default FlexView;
