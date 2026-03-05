export const JsonContentNode = (props: any) => {
  const data = props.data.value || {};
  return typeof data === "object"
    ? <div  className="json-content-container">{Object.entries(data).map(([key, value]: any) => {
        return <div className="json-content-container-wrap" key={key}>
          {key !== "root" && <div className="json-key">{key}:</div>}
          <div className="json-value">{value}</div>
        </div>;
      })}</div>
    : "";
};
