import { Component } from 'react';

export class TextClass extends Component {
  render() {
    return (
      <div
        style={{
          textDecoration: this.props.underline ? 'underline' : 'inherit',
          textAlign: this.props.align,
          fontWeight: this.props.weight,
          border: this.props.border,
          fontSize: `${this.props.size}px`,
          color: this.props.color,
          padding: `${this.props.padding}px`,
          margin: `${this.props.margin}px`,
        }}
      >
        Lorem ipsum dolor sit amet.
      </div>
    );
  }
}
