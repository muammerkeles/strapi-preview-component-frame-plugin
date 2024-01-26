import React, { useState } from "react";
import PropTypes from "prop-types";

import {
    Box,
    Button,
    Typography,
    ModalLayout,
    ModalBody,
    ModalHeader,
} from "@strapi/design-system";

//const { selam } = strapi.config.get("plugins.config")
const prerender = ({
    //All these parameters are passed from admin\src\index.js

    attribute,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    //console.log("strapi.config", strapi)
    console.log("attrrrr", attribute)
    console.log("ggg", TARGET_URL)
    return (
        <Box>
            <Box paddingTop={2}>
                <Button onClick={() => setIsVisible((prev) => !prev)}>                   
                        Live
                </Button>
            </Box>
            {isVisible && (
                <ModalLayout
                    onClose={() => setIsVisible((prev) => !prev)}
                    labelledBy="title"
                >
                    <ModalHeader>
                        <Typography
                            textColor="white"
                            as="h3"
                            id="title"
                        >
                            Previewing
                        </Typography>
                    </ModalHeader>
                    <ModalBody style={{ height: "auto", maxHeight: "100vh" }}>
                        <iframe
                            style={{ width: "100%", height: "100vh",maxHeight:"67vh" }}
                            src={TARGET_URL + attribute.options.url}
                        />
                    </ModalBody>
                </ModalLayout>
            )}
        </Box>
    );
};

//default value if no value is given

prerender.defaultProps = {};

// validation
prerender.propTypes = {
    attribute: PropTypes.object.isRequired,
};

export default prerender;