import { toast } from 'react-toastify';
import { Button } from "antd";


function validateMessages() {
    /* eslint-disable no-template-curly-in-string */

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    return validateMessages;
}

function errorResponse(error) {
    if (error.response.status === 422) {
        let errorData = error.response.data;
        if (errorData) {
            if (errorData.message) {
                toast(`${errorData.message} !`);
            }
            if (error.response.data.data) {
                var errors = Object.values(error.response.data.data);
                if (errors) {
                    errors.forEach((err) => {
                        toast(`${err} !`);
                    });
                }
            }
        }
    }
    if (error.response.status === 401) {
        let errorData = error.response.data.message;
        localStorage.clear();
        toast(`${errorData} !`);
        window.location.reload();
    }

}

function successResponse(response) {
    if (response.status === 200) {
        if (response.data.message) {
            toast.success(`${response.data.message} !`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
}


function currencyList(currency) {
    var result = '';

    if (Number(currency) === 1) {
        result = "GBP"
    }
    if (Number(currency) === 2) {
        result = "AUD"
    }
    if (Number(currency) === 3) {
        result = "INR"
    }

    return result;
};

function statusList(status) {
    var result = <Button className='' style={{ color: '#7b7771', backgroundColor: '#F09E00', borderRadius: 10 }}>
        --
    </Button>;

    if (Number(status) === 1) {
        result = <Button className='' style={{ color: '#fff', backgroundColor: '#dfddda', borderRadius: 10 }}>
            Not scheduled
        </Button>
    }
    if (Number(status) === 2) {
        result = <Button className='' style={{ color: '#a86d3e', backgroundColor: '#f9d6b8', borderRadius: 10 }}>
            Pending submission
        </Button>
    }
    if (Number(status) === 3) {
        result = <Button className='' style={{ color: '#a86d3e', backgroundColor: '#f9d6b8', borderRadius: 10 }}>
            Pending customer approval
        </Button>
    }
    if (Number(status) === 4) {
        result = <Button className='' style={{ color: '#a86d3e', backgroundColor: '#f9d6b8', borderRadius: 10 }}>
            Collating...
        </Button>
    }

    if (Number(status) === 5) {
        result = <Button className='' style={{ color: '#399274', backgroundColor: '#cff5e7', borderRadius: 10 }}>
            Paid Out
        </Button>
    }

    if (Number(status) === 6) {
        result = <Button className='' style={{ color: '#9e9b96', backgroundColor: '#ceccc8', borderRadius: 10 }}>
            Cancelled
        </Button>
    }

    if (Number(status) === 7) {
        result = <Button className='' style={{ color: '#399274', backgroundColor: '#cff5e7', borderRadius: 10 }}>
            Installment n of paid
        </Button>
    }


    if (Number(status) === 8) {
        result = <Button className='' style={{ color: '#9e9b96', backgroundColor: '#ceccc8', borderRadius: 10 }}>
            Installment schedule cancelled
        </Button>
    }

    if (Number(status) === 9) {
        result = <Button className='' style={{ color: '#9e9b96', backgroundColor: '#ceccc8', borderRadius: 10 }}>
            Installment creation failed
        </Button>
    }

    if (Number(status) === 10) {
        result = <Button className='' style={{ color: '#9e9b96', backgroundColor: '#ceccc8', borderRadius: 10 }}>
            Failed
        </Button>
    }

    if (Number(status) === 11) {
        result = <Button className='' style={{ color: '#f45c62', backgroundColor: '#feddde', borderRadius: 10 }}>
            Need attention
        </Button>
    }


    return result;
};
export {
    validateMessages,
    errorResponse,
    statusList,
    currencyList,
    successResponse,
};