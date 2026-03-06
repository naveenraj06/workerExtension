export const JsonContentNode = (props: any) => {
  const data:any = props.data.value || {};
  return typeof data === "object"
    ? <div  className="json-content-container">{Object.entries(data).map(([key, value]: any) => {
        return <div className="json-content-container-wrap" key={key}>
          {key !== "root" && <div className="json-key">{key}:</div>}
          <div className="json-value">{value}</div>
        </div>;
      })}</div>
    : <div  className="json-content-container only-label"><div className="json-value"><div className="json-content-container-wrap">{data}</div></div></div>;
};
