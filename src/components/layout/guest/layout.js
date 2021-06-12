import React, { Component } from "react";

class GuestLayout extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <>
        <div className="flex flex-col min-h-screen overflow-hidden">

          {/*  Page content */}
          <main className="flex-grow">
            {/*  Page sections */}
            {this.props.children}
          </main>

        </div>
      </>
    );
  }
}

export default GuestLayout;
