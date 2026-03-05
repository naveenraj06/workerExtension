export const EditorErrorView = ({
  hasErrror = false,
  errors = [],
    onClose,
}: {
  hasErrror: boolean;
  errors: any[];
  onClose?: () => void;
}) => {

    const handleClose = () => { onClose && onClose(); }
    
  return (
    <div className="editor-error-view">
      <div className="close-editor-error-view" onClick={handleClose}>
        Close
      </div>
      <div className="error-list">
        {hasErrror ? (
          errors.map((error: any, index: number) => (
            <div key={`error-${index}`} className="error-item">
              Line {error.startLineNumber}, Column {error.startColumn}:{" "}
              {error.message}
            </div>
          ))
        ) : (
          <div className="no-errors">No validation errors</div>
        )}
      </div>
    </div>
  );
};
