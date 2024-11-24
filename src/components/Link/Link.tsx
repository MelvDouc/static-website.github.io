import { navigate } from "client-side-router";

export default function Link(props: JSX.IntrinsicElements["a"] & { children?: any; }): HTMLAnchorElement {
  const { $init, children, ..._props } = props;

  return (
    <a
      {..._props}
      $init={(element) => {
        $init && $init(element);
        element.addEventListener("click", async (e) => {
          e.preventDefault();
          await navigate(element.pathname);
        });
      }}
    >{children}</a>
  );
}