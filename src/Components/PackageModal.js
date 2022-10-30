import React from "react";
import { ThemeProvider, LabelBase, ButtonBase } from "@reusejs/react";

import newTheme from "../Components/variants";

export default function PackageModal(props) {
  return (
    <ThemeProvider value={newTheme}>
      <div>
        <div className="mt-8">
          <LabelBase
            label="Are you sure you want to delete ?"
            variant="secondary"
          />
        </div>
        <div className="flex items-center justify-center gap-5 my-6">
          <ButtonBase
            label="Cancel"
            onClick={() => {
              props.onAction("close");
            }}
            variant="redButton"
          />
          <ButtonBase
            label="Yes"
            variant="greenButton"
            onClick={() => props.onAction("yes")}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
