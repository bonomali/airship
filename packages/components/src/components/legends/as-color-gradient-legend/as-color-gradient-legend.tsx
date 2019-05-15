import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-color-gradient-legend.scss',
  tag: 'as-color-gradient-legend',
})
export class ColorGradientLegend {
  @Prop() public data: GradientData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data) {
      return null;
    }

    const outerClasses = {
      'as-color-gradient-legend--outer-wrapper': true,
      [`as-color-gradient-legend--${this.orientation}`]: true
    };

    const properData = this.data.slice();

    // TODO: document this intrinsic behaviour
    if (this.orientation === 'vertical') {
      properData.reverse();
    }

    return <div class={outerClasses}>
      <div class='as-color-gradient-legend--wrapper as-color-gradient-legend--color'>
        {properData.map((data, index, arr) => this.renderGradientStep(data, index, arr))}
      </div>
      <div class='as-color-gradient-legend--wrapper as-color-gradient-legend--labels'>
        {properData.map((data, index, arr) => this.renderLabel(data, index, arr))}
      </div>
    </div>;
  }

  private renderGradientStep(data: GradientData, index: number, arr: GradientData[]) {
    if (index === arr.length - 1) {
      return null;
    }

    const start = data.color;
    const end = arr[index + 1].color;
    const direction = this.orientation === 'vertical' ? '.5turn' : '.25turn';

    const style = {
      backgroundImage: `linear-gradient(${direction}, ${start}, ${end})`
    };

    return (
      <div class='as-color-gradient-legend--step' style={style}>
      </div>
    );
  }

  private renderLabel(data: GradientData, index: number, arr: GradientData[]) {
    if (this.orientation === 'vertical' && index === 0) {
      return null;
    }

    if (this.orientation === 'horizontal' && index === arr.length - 1) {
      return null;
    }

    return (
      <div class='as-color-gradient-legend--label'>
        <span>
          {data.label}
        </span>
      </div>
    );
  }
}