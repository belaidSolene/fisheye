class Form extends Modal {
    constructor(idForm, $wrapperForm) {
        super()
        this._idForm = idForm;
        this._$wrapperForm = $wrapperForm;
        this._closeForm = this._closeForm.bind(this);
    }

    _generateForm(formFields) {
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
            this._$feedbackWrited.setAttribute('role', 'alert');
            this._$feedbackWrited.setAttribute('aria-atomic', 'true');
            this._$feedbackWrited.setAttribute('aria-live', 'polite');

            this._$hintKeyEvent = document.createElement('p');
            this._$hintKeyEvent.classList.add('sr-only');
            this._$hintKeyEvent.setAttribute('role', 'status');
            this._$hintKeyEvent.setAttribute('aria-atomic', 'true');
            this._$hintKeyEvent.setAttribute('aria-live', 'polite');

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
        let isValid = false;
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
            this._form.removeEventListener('keydown', getToFirstInvalidField);
            isValid = true;
        } else {
            const accord = nbError > 1 ? 'champs sont erronés' : 'champ est erroné';
            this._$feedbackWrited.innerHTML = `Le formulaire ne peut être envoyé : ${nbError} ${accord}. &nbsp;`;

            this._$hintKeyEvent.innerHTML = `Avec le raccourci clavier [flèche haute] ou [flèche droite], vous pouvez accéder au premier champ erroné. &nbsp;`
            this._form.addEventListener('keydown', getToFirstInvalidField);
        }
        return isValid;
    }

    _validationFields(validators) {
        let errors = 0;

        validators.forEach((fcts, key) => {
            const field = document.getElementById(key);

            if (field.hasAttribute('required')) {
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
        div.setAttribute('data-error', message);
        div.setAttribute('data-error-visible', true);

        const idError = `err-${field.id}`;
        const errDiv = div.querySelector(`#${idError}`);

        if (errDiv) {
            errDiv.innerHTML = message;
        } else {
            div.setAttribute('data-error-visible', true);
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-errormessage', idError);

            const errDiv = document.createElement('label');
            errDiv.setAttribute('for', field.id);
            errDiv.classList.add('sr-only');
            errDiv.id = idError
            errDiv.innerHTML = message;
            div.appendChild(errDiv);
        }
    }

    _deleteDataError(field) {
        const div = field.parentNode;
        div.setAttribute('data-error-visible', false);

        if (field.hasAttribute('aria-invalid')) {
            field.setAttribute('aria-invalid', 'false');
            const $errDiv = div.querySelector(`#err-${field.id}`);
            $errDiv.innerHTML = 'Ce champ est validé';
        }
    }

    _resetForm() {
        this._form.reset();

        const $formData = this._form.querySelectorAll('.formData');
        $formData.forEach(div => {
            if (div.hasAttribute('data-error')) {
                div.removeAttribute('data-error');
                div.setAttribute('data-error-visible', 'false');
            }
        })

        const $srOnly = this._form.querySelectorAll('.sr-only');
        $srOnly.forEach(div => {
            div.innerHTML = "";
        })

        this._$feedbackWrited.innerHTML = "";
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
        super._closeModal();
        this._$wrapperForm.classList.remove("active");
        this._resetForm();
        this._openerElement.focus();

        document.removeEventListener('wheel', this._handleOutsideWheel, { passive: false });
    }

    _openForm() {
        super._openModal();
        this._$wrapperForm.classList.add("active");
        this._$wrapperForm.focus();
    
        document.addEventListener('wheel', this._handleOutsideWheel, { passive: false });
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
                    required: 'true',
                    'aria-required': true,
                    minlength: 2,
                    autocomplete: 'off',
                },
            },
            {
                label: "Nom",
                name: "lastName",
                type: "text",
                attributs: {
                    required: 'true',
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
                    // required: 'true',
                    'aria-required': true,
                    autocomplete: 'off',
                },
            },
            {
                label: "Message",
                name: "message",
                type: "textarea",
                attributs: {
                    // required: 'true',
                    'aria-required': true,
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
        this._form = this._generateForm(this._formFields);
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

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('id', 'form-btn-close')
        closeBtn.classList.add('contact__btn-close');
        closeBtn.innerHTML = '<img src="/public/assets/icons/close.svg" />';

        this._$wrapperForm.appendChild(closeBtn);
        this._addEventListener();
    }

    validation() {
        if (this._validationForm()) {

            const response = this.response();

            console.log(`Formulaire Validé`);
            console.log(response);

            this._closeForm();
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
                this._closeForm();
            }
        })

        const closeBtn = this._$wrapperForm.querySelector('#form-btn-close');
        closeBtn.addEventListener('click', this._closeForm);
    }
}


