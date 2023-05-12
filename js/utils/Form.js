class Form {
    constructor(idForm, $wrapperForm) {
        this._idForm = idForm;
        this._$wrapperForm = $wrapperForm;
        this._isOpen = false;
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
        this._closeForm = this._closeForm.bind(this);
    }

    generateFields(formFields) {
        // Création du formulaire
        const form = document.createElement("form");
        form.id = this._idForm;

        // Function to generate elements
        const generateLabel = ({ label, name }) => {
            const fieldLabel = document.createElement("label");
            fieldLabel.setAttribute('for', name);
            fieldLabel.textContent = label;
            return fieldLabel;
        };

        const generateInput = ({ name, type, options, attributs }) => {
            let fieldInput;
            if (type === "textarea") {
                fieldInput = document.createElement("textarea");
            } else if (type === "select") {
                fieldInput = document.createElement("select");
                options.forEach((option) => {
                    const selectOption = document.createElement("option");
                    selectOption.value = option;
                    selectOption.textContent = option;
                    fieldInput.appendChild(selectOption);
                });
            } else {
                fieldInput = document.createElement("input");
                fieldInput.type = type;
            }

            fieldInput.id = name;
            fieldInput.name = name;

            // Add custom attributes
            if (attributs) {
                for (const [attr, value] of Object.entries(attributs)) {
                    fieldInput.setAttribute(attr, value);
                }
            }

            return fieldInput;
        };

        const generateFormFeedback = () => {
            const $wrapperFeedback = document.createElement("div");
            $wrapperFeedback.classList.add('form-feedback');
            $wrapperFeedback.setAttribute('aria-live', 'assertive');

            this._$feedbackWrited = document.createElement('p');
            this._$hintKeyEvent = document.createElement('p');

            $wrapperFeedback.appendChild(this._$feedbackWrited);
            $wrapperFeedback.appendChild(this._$hintKeyEvent);

            return $wrapperFeedback;
        }

        // Boucle pour créer les champs du formulaire
        formFields.forEach((field) => {
            const { label, name, type, options, attributs } = field;

            const fieldLabel = generateLabel({ label, name });
            const fieldInput = generateInput({ name, type, options, attributs });

            const $wrapper = document.createElement('div');
            $wrapper.classList.add('formData');

            $wrapper.appendChild(fieldLabel);
            $wrapper.appendChild(fieldInput);
            form.appendChild($wrapper);
        });

        form.appendChild(generateFormFeedback());
        return form;
    }

    _validationForm() {
        const nbError = this._validationFields(this._validators);
        const getToFirstInvalidField = (event) => {
            const key = event.key;

            if (key === 'ArrowUp' || key === 'ArrowRight') {
                event.preventDefault();
                const wrongFields = this._form.querySelectorAll('[aria-invalid="true"]');
                wrongFields[0].focus();
            }
        }

        this._$feedbackWrited.innerHTML = "";
        this._$hintKeyEvent.innerHTML = "";

        if (nbError === 0) {
            const $allErrorMsg = this._form.querySelectorAll('.error-msg');
            $allErrorMsg.forEach(($errDiv) => {
                $errDiv.innerHTML = "";
            })

            this._form.removeEventListener('keydown', getToFirstInvalidField);
        } else {
            const accord = nbError > 1 ? 'champs sont erronés' : 'champ est erroné';
            this._$feedbackWrited.innerHTML = `Le formulaire ne peut être envoyé : ${nbError} ${accord}.`;

            this._$hintKeyEvent.classList.add('sr-only');
            this._$hintKeyEvent.innerHTML = `Avec le raccourci clavier [flèche haute] ou [flèche droite], vous pouvez accéder au premier champ erroné.`

            this._form.addEventListener('keydown', getToFirstInvalidField);
        }
    }

    _validationFields(validators) {
        let errors = 0;

        validators.forEach((fcts, key) => {
            const field = document.getElementById(key);
            if (field.hasAttribute('aria-required')) {
                const msgErreur = [];

                fcts.forEach((fct) => {
                    const response = fct(field);

                    if (response !== false) {
                        msgErreur.push(response);
                    }
                });


                if (msgErreur.length >= 1) {
                    this._setDataError(field, msgErreur[0]);
                    errors++;
                } else {
                    this._deleteDataError(field);
                }
            }
        });

        return (errors);
    }

    isEmpty(field) {
        return field.validity.valueMissing ? "Ce champ est obligatoire" : false;
    }

    isPatternRespected(field) {
        const regexByField = new Map([
            // key : id of the field
            // value: an array with first --> regex, second --> error message
            ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
            ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
            ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/i, "Email non valide"]],
        ]);

        const regexField = regexByField.get(field.id);
        if (!regexField) {
            throw new Error(`Regex for field with ID '${field.id}' not found`);
        }

        return regexField[0].test(field.value) ? false : regexField[1];
    }

    _setDataError(field, message) {
        const div = field.parentNode;
        const idError = `err-${field.id}`;

        const oldError = div.querySelector(`#${idError}`);

        if (oldError) {
            oldError.remove();
        } else {
            div.setAttribute('data-error-visible', true);

        }

        const errDiv = document.createElement('label');
        errDiv.setAttribute('for', field.id);
        errDiv.classList.add('error-msg');
        errDiv.id = idError
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-errormessage', idError);
        errDiv.innerHTML = message;
        div.appendChild(errDiv);
    }

    _deleteDataError(field) {
        const div = field.parentNode;
        div.setAttribute('data-error-visible', false);

        if (field.hasAttribute('aria-invalid')) {
            field.setAttribute('aria-invalid', 'false');
            const $errDiv = div.querySelector(`#err-${field.id}`);
            $errDiv.classList.add('sr-only');
            $errDiv.innerHTML = 'Ce champ est validé';
        }
    }

    _getFormData() {
        const formData = {};
        const inputs = document.querySelectorAll(`#${this._idForm} input, #${this._idForm} textarea`);
        formData.idForm = this._idForm;

        inputs.forEach((input) => {
            formData[input.id] = input.value;
        });

        return formData;
    }

    toggleForm(openerElement) {
        this._openerElement = openerElement;

        this._isOpen ? this._closeForm() : this._openForm();
    }

    _closeForm() {
        document.querySelector("#modal-section").classList.remove("active");
        document.querySelector("#contact-form").classList.remove("active");
        this._isOpen = false;
        document.querySelector(".container").inert = false;
        document.removeEventListener('click', this._handleOutsideClick);
        document.removeEventListener('wheel', this._handleOutsideWheel, { passive: false });
        this._form.reset();

        this._openerElement.focus();
    }

    _openForm() {
        document.querySelector("#modal-section").classList.add("active");
        document.querySelector("#contact-form").classList.add("active");
        this._isOpen = true;
        document.querySelector(".container").inert = true;
        document.addEventListener('click', this._handleOutsideClick);
        document.addEventListener('wheel', this._handleOutsideWheel, { passive: false });

        this._$wrapperForm.focus();
    }

    _handleOutsideClick(event) {
        if (this._isOpen && !this._$wrapperForm.contains(event.target)) {
            this._closeForm();
        }
    }

    _handleOutsideWheel(event) {
        event.preventDefault();
    }
}

class ContactForm extends Form {
    constructor(idForm, $wrapperForm) {
        super(idForm, $wrapperForm);

        this._formFields = [
            {
                label: "Prénom",
                name: "firstName",
                type: "text",
                attributs: {
                    'aria-required': true,
                    minlength: 2,
                    autocomplete: 'off',
                }
            },
            {
                label: "Nom",
                name: "lastName",
                type: "text",
                attributs: {
                    'aria-required': true,
                    minlength: 2,
                    autocomplete: 'off',
                },
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                attributs: {
                    //  'aria-required': true,
                    autocomplete: 'off',
                },
            },
            {
                label: "Message",
                name: "message",
                type: "textarea",
                attributs: {
                    //  'aria-required': true,
                    autocomplete: 'off',
                },
            },
        ];
        this._validators = new Map([
            ['firstName', [this.isEmpty, this.isPatternRespected]],
            ['lastName', [this.isEmpty, this.isPatternRespected]],
            ['email', [this.isEmpty, this.isPatternRespected]],
            ['message', [this.isEmpty]],
        ]);
    }

    generate() {
        this._form = this.generateFields(this._formFields);
        this._form.noValidate = true;

        // Création du bouton d'envoi
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Envoyer";
        submitButton.classList.add('btn')
        submitButton.classList.add('btn--submit')
        this._form.appendChild(submitButton);

        this._form.addEventListener("submit", (event) => {
            event.preventDefault(); // Empêche l'envoi du formulaire par défaut
            this.validation(); // Appelle la méthode de validation de ContactForm
        });

        // Ajout du formulaire au conteneur
        this._$wrapperForm.appendChild(this._form);
        this._addEventListener();
    }

    validation() {
        const nbError = this._validationFields(this._validators);
        this._validationForm();
        if (5 === 0) {


            const response = this.response();

            console.log(`Formulaire Validé`);
            console.log(response);

            this.toggleForm();
            this._form.reset();
        }
    }

    response() {
        const formData = this._getFormData();
        const response = {
            idForm: formData.idForm,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            message: formData.message
        };

        return response;
    }

    _addEventListener() {
        this._$wrapperForm.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key === 'Escape') {
                this.toggleForm();
            }
        })

        const closeBtn = this._$wrapperForm.querySelector('#btn-close-form');
        closeBtn.addEventListener('click', this._closeForm);
    }
}


