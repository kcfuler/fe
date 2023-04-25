import { memo } from "react";
import { IconoirProvider, Check } from "iconoir-react";

export const TestIcon = memo(() => {
  return (
    <IconoirProvider
      iconProps={{
        color: "red",
        strokeWidth: 1,
        width: "1em",
        height: "1em",
      }}
    >
      <div>
        <Check />
      </div>
    </IconoirProvider>
  );
});
