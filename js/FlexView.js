import ComponentView from 'core/js/views/componentView';
import FlexModel from './FlexModel'

class FlexView extends ComponentView {

  preRender() {
    this.onClick = this.onClick.bind(this);
    this.model.set('_tabFocused', false);
  }

  postRender() {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });

    // Accessiblity hack - unlock buttons for tab
    const context = this;
    this.$('.flex-item__content-inner').one('focus',function() {
      context.unlockButtons();
    });

    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  unlockButtons() {
    this.model.set('_tabFocused', true);
  }

  onClick(event) {
    this.model.toggleItemsState($(event.currentTarget).parents('.js-flex-item').data('index'));
  }

}

FlexView.template = 'flex.jsx';

export default FlexView;
