
/* 类继承 */

/**
 * 就地编辑
 * @param id
 * @param parent
 * @param value
 * @constructor
 */
function EditInPlaceField(id, parent, value) {
    this.id = id;
    this.parentEle = parent;
    this.value = value || "default value";

    this.createElement(this.id);
    this.attachEvent();
}

EditInPlaceField.prototype = {
    // 创建dom
    createElement: function (id) {
        this.wrapper = document.createElement('div');
        this.parentEle.appendChild(this.wrapper);

        this.staticElement = document.createElement('span');
        this.wrapper.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.filedElement = document.createElement('input');
        this.filedElement.type = "text";
        this.filedElement.value = this.value;
        this.wrapper.appendChild(this.filedElement);

        this.saveButton = document.createElement('input');
        this.saveButton.type = "button";
        this.saveButton.value = "Save";
        this.wrapper.appendChild(this.saveButton);

        this.cancelButton = document.createElement('input');
        this.cancelButton.type = "button";
        this.cancelButton.value = "cancel";
        this.wrapper.appendChild(this.cancelButton);
        
        this.converToText();
    },
    attachEvent: function () {
        var that = this;
        this.staticElement.addEventListener('click', function () {
            that.convertToEditor();
        })
        this.saveButton.addEventListener('click', function () {
            that.save();
        })
        this.cancelButton.addEventListener('click', function () {
            that.cancel();
        })
    },
    convertToEditor: function () {
        this.staticElement.style.display = "none";
        this.saveButton.style.display = "inline";
        this.filedElement.style.display = "inline";
        this.cancelButton.style.display = "inline";


        this.setValue(this.value);
    },
    setValue: function (val) {
        this.filedElement.value = val;
        this.staticElement.innerHTML = val;
    },
    getValue: function () {
        return this.filedElement.value;
    },
    save: function () {
        this.value = this.getValue();

        this.converToText();
    },
    cancel: function() {
        this.converToText();
    },
    converToText: function () {
        this.staticElement.style.display = "inline";
        this.saveButton.style.display = "none";
        this.filedElement.style.display = "none";
        this.cancelButton.style.display = "none";

        this.setValue(this.value);
    }


    
    
}

