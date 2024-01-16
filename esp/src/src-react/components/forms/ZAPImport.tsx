import * as React from "react";
import { DefaultButton, PrimaryButton, Stack } from "@fluentui/react";
import { useForm } from "react-hook-form";
import { scopedLogger } from "@hpcc-js/util";
import nlsHPCC from "src/nlsHPCC";
import { MessageBox } from "../../layouts/MessageBox";

const logger = scopedLogger("src-react/components/forms/ZAPImport.tsx");

interface ZapImportFormValues {
    zapFile: any;
}

const defaultValues: ZapImportFormValues = {
    zapFile: undefined
};

interface ZAPImportProps {
    showForm: boolean;
    setShowForm: (_: boolean) => void;
}

export const ZAPImport: React.FunctionComponent<ZAPImportProps> = ({
    showForm,
    setShowForm
}) => {

    const [uploadFile, setUploadFile] = React.useState();
    const handleFileSelect = React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const files = [...evt.target.files];
        if (files.length > 0) {
            setUploadFile(files[0]);
        }
    }, [setUploadFile]);

    const { handleSubmit, control, reset } = useForm<ZapImportFormValues>({ defaultValues });

    const closeForm = React.useCallback(() => {
        setShowForm(false);
    }, [setShowForm]);

    const doSubmit = React.useCallback((data) => {
        handleSubmit(
            (data, evt) => {
                console.log(data);
                console.log(uploadFile);
                fetch("/WsWorkunits/ImportWUZAPFile.json?upload_", {
                    method: "POST",
                    body: uploadFile,
                })
                    // .then(response => response.json())
                    .then(response => {
                        console.log(response); return;
                        // const exceptions = response?.Exceptions?.Exception ?? [];
                        // if (exceptions.length > 0) {
                        //     logger.error(exceptions[0]?.Message ?? nlsHPCC.ErrorUploadingFile);
                        //     return;
                        // }
                        // const DFUActionResult = response?.UploadFilesResponse?.UploadFileResults?.DFUActionResult ?? [];
                        // if (DFUActionResult.filter(result => result.Result !== "Success").length > 0) {
                        //     logger.error(nlsHPCC.ErrorUploadingFile);
                        // } else {
                        //     closeForm();
                        //     reset(defaultValues);
                        // }
                    })
                    .catch(err => logger.error(err));
            },
            err => {
                console.log(err);
            }
        )();
    }, [closeForm, handleSubmit, uploadFile]);

    return <MessageBox title={nlsHPCC.Import} show={showForm} setShow={closeForm}
        footer={<>
            <PrimaryButton text={nlsHPCC.Upload} onClick={handleSubmit(doSubmit)} />
            <DefaultButton text={nlsHPCC.Cancel} onClick={() => closeForm()} />
        </>}>
        <Stack>
            <p style={{ margin: 0 }}>Select a ZAP file archive to import.</p>
            <input id="uploaderBtn" type="file" accept="*.zip" onChange={handleFileSelect} multiple={false} />
        </Stack>
    </MessageBox>;
};