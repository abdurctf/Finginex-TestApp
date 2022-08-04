<template>
  <base-material-card>
    <template v-slot:heading>
      <v-row class="row-page-header-margin">
        <v-col cols="12" md="4" class="headline"> Customer </v-col>
        <v-col cols="12" md="6" offset="2">
          <button-component-editview
            v-if="isOld"
            :button1="'OK'"
            :button2="'Delete'"
            :button3="'View'"
            :button4="'Refresh'"
            :button5="'Exit'"
            @onSubmitFromChildren="onEdit"
            @onDeleteFromChildren="onDelete"
            @onViewFromChildren="onView"
            @onRefreshFromChildren="onRefresh"
            @onExitFromChildren="onExit"
          ></button-component-editview>
          <button-component-text
            v-if="isNew"
            :button1="'OK'"
            :button2="'View'"
            :button3="'Refresh'"
            :button4="'Exit'"
            @onSubmitFromChildren="onSave"
            @onViewFromChildren="onView"
            @onRefreshFromChildren="onRefresh"
            @onExitFromChildren="onExit"
          ></button-component-text>
        </v-col>
      </v-row>
    </template>

    <br />
    <br />
    <v-container>
      <base-material-card>
        <template v-slot:heading>
          <div class="display-2 font-weight-light head">
            Customer Profile with NFT
          </div>
        </template>
        <v-card flat>
          <v-form ref="customerForm" v-model="isFormValid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-tooltip top nudge-bottom="30" nudge-right="50">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        filled
                        :rules="[
                          isOld
                            ? elementaryRules.required
                            : elementaryRules.maxLengthWithoutRequired(10),
                        ]"
                        v-bind="attrs"
                        v-on="on"
                        placeholder="[AUTO]"
                        label="Customer ID"
                        v-model="customer_id"
                        @keypress="customer_id = onlyNumber(customer_id); "
                        @blur="onIDChange"
                        @dblclick="oncustomeridDblClick"
                      ></v-text-field>
                    </template>
                    <span>10 digit customer id</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <br />

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-tooltip top nudge-bottom="30" nudge-left="40">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Customer Name"
                        v-model="customer_name"
                        :rules="[
                          ...elementaryRules.required,
                          ...elementaryRules.maxLength(30),
                        ]"
                        ><template #label>
                          <span class="red--text"><strong>* </strong></span
                          >Customer Name
                        </template>
                      </v-text-field>
                    </template>
                    <span>Maximum Length 30</span>
                  </v-tooltip>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-tooltip top nudge-bottom="30" nudge-left="40">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Father Name"
                        v-model="father_name"
                        :rules="[
                          ...elementaryRules.required,
                          ...elementaryRules.maxLength(50),
                        ]"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >Father Name
                        </template></v-text-field
                      >
                    </template>
                    <span>Maximum Length 50</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <br />

              <v-row>
                <v-col cols="12" sm="4" md="3">
                  <v-tooltip top nudge-bottom="30" nudge-right="50">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Mother Name"
                        v-model="mother_name"
                        :rules="[elementaryRules.maxLengthWithoutRequired(40)]"
                      ></v-text-field>
                    </template>
                    <span>Maximum Length 40</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-autocomplete
                    ref="genderRef"
                    label="Gender"
                    clearable
                    persistent-hint
                    :items="genderList"
                    item-text="gender_text"
                    item-value="gender_value"
                    v-model="gender"
                  >
                  </v-autocomplete>

                  
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <DatePickerWithText
                    v-model="date_of_birth"
                    dateLabel="Date of Birth"
                    :requiredRules="false"
                  />
                 
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-autocomplete
                    ref="marital_statusRef"
                    label="Marital Status"
                    clearable
                    persistent-hint
                    :items="marital_status_list"
                    item-text="marital_status_text"
                    item-value="marital_status_value"
                    v-model="marital_status"
                  >
                  </v-autocomplete>
                  
                </v-col>
              </v-row>
              <br />
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-tooltip top nudge-bottom="30" nudge-right="50">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Spouse Name"
                        v-model="spouse_name"
                        :rules="[elementaryRules.maxLengthWithoutRequired(50)]"
                      ></v-text-field>
                    </template>
                    <span>Maximum Length 50</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-tooltip top nudge-bottom="30" nudge-right="50">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="NID"
                        v-model="nid"
                        :rules="compositeRules.nidRules"
                      ></v-text-field>
                    </template>
                    <span>Maximum Length 17</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          
        </v-card>
      </base-material-card>
    </v-container>
  </base-material-card>
</template>

<script>
import ViewOKButton from "@/components/ViewOKButton.vue";
import EditDeleteViewButton from "@/components/EditDeleteViewButton.vue";
import { elementaryRules, compositeRules } from "@/rules/rules.js";
import { Get_Padded_Customer_Id,  onlyNumber } from "@/js/commonMethods.js";

var SaveAPIBody = {
  path: "",
  method: "",
  data: {
    UserId: "",
    BranchId: "",
    BusinessData: {},
  },
};

export default {
  name: "customerprofilewithnftUI",
  components: {
    "button-component-text": ViewOKButton,
    "button-component-editview": EditDeleteViewButton,
    
  },
  data() {
    return {
      userId: "shafique",
      branchId: "0031",
      branchName: "",
      isFormValid: false,
      elementaryRules: elementaryRules,
      compositeRules: compositeRules,
      SaveAPIBody: SaveAPIBody,
      Get_Padded_Customer_Id: Get_Padded_Customer_Id,
      isNew: true,
      isOld: false,
      DataFromAPI: [],
      transDate: new Date(),
      functionID: "",
onlyNumber: onlyNumber,
      //================================
      customerModal: false,
      customer_id: "",
      customer_category_id: "",
      customer_name: "",
      father_name: "",
      mother_name: "",
      gender: "",
      date_of_birth: "",
      marital_status: "",
      spouse_name: "",
      nid: "",
      auth_status_id: "",
      make_by: "",
      make_dt: "",
      auth_1st_by: "",
      auth_1st_dt: "",
      auth_2nd_by: "",
      auth_2nd_dt: "",
      last_action: "",
      
      genderList: [
        {
          gender_value: "M",
          gender_text: "Male",
        },
        {
          gender_value: "F",
          gender_text: "Female",
        },
         {
          gender_value: "T",
          gender_text: "Third Gender",
        },
      ],
      marital_status_list: [
        { marital_status_text: "Married", marital_status_value: "M" },
        { marital_status_text: "Unmarried", marital_status_value: "U" },
      ],
    };
  },
  async created() {
    

    const businessData = {
      nameValueList: "0",
    };
  },
  mounted() {},
  methods: {
    oncustomeridDblClick() {
      this.customerModal = true;
    },
    async onIDChange() {
      if (this.stringIsEmptyOrNullCheck(this.customer_id)) {
        return;
      } else {
        let tempID = this.customer_id;
        await this.GetCustomerProfileById(tempID);
      }
    },
    async GetCustomerProfileById() {
      const businessData = {
        customer_id: Get_Padded_Customer_Id(this.customer_id),
      };
      const response = await this.$getApiCall(
        "testproject",
        "CustomerProfile/GetCustomerProfileById",
        businessData
      );
      if (
        response !== null &&
        response !== undefined &&
        response.length !== 0
      ) {
        debugger;
        this.DataFromAPI = response;
        this.customer_id = this.DataFromAPI.customer_id;
        this.customer_name = this.DataFromAPI.customer_name;
        this.father_name = this.DataFromAPI.father_name;
        this.mother_name = this.DataFromAPI.mother_name;
        this.gender = this.DataFromAPI.gender;
        this.date_of_birth = this.DataFromAPI.date_of_birth;
        this.marital_status = this.DataFromAPI.marital_status;
        this.spouse_name = this.DataFromAPI.spouse_name;
        this.nid = this.DataFromAPI.nid;
        this.isNew = false;
        this.isOld = true;
      } else {
        this.onRefresh();
        this.$root.$snackbar.seterrortext("Customer Not Found!");
      }
    },
    setSelectedTableItem(selectedItem) {
      this.customer_id = selectedItem.customer_id;
      this.GetCustomerProfileById();
    },
    stringIsEmptyOrNullCheck(str) {
      if (str === "" || str === null || str === undefined) {
        return true;
      } else {
        return false;
      }
    },
    checkValidations() {
      var str = "";
      if (this.stringIsEmptyOrNullCheck(this.nid)) {
        str = str + "'NID is Required' \n";
      }
      if (this.stringIsEmptyOrNullCheck(this.gender)) {
        str = str + "'Gender is Required' ";
      }
      return str;
    },
    async onSaveAPICall() {
      const response = await this.$postApiCall(
        "testproject",
        "CustomerProfile/SaveCustomerProfileNFT",
        this.SaveAPIBody.data.BusinessData
      );
      if (response.status) this.onRefresh();
    },
    onSave() {
      debugger;
      var str = this.checkValidations();
      if (this.stringIsEmptyOrNullCheck(str)) {
        if (this.isFormValid) {
          this.SaveAPIBody.data.BusinessData.isOld = false;
          this.SaveAPIBody.data.BusinessData.isAdd = true;
          this.SaveAPIBody.data.BusinessData.isDelete = false;

         

          this.fillBodyData();
          this.onSaveAPICall();
        } else {
          this.$root.$snackbar.seterrortext(
            "Please fill all the required fields"
          );
        }
      } else {
        this.$root.$snackbar.seterrortext(str);
      }
    },
    onDelete() {
      this.SaveAPIBody.data.BusinessData.customer_id = this.customer_id;
      this.SaveAPIBody.data.BusinessData.isOld = true;
      this.SaveAPIBody.data.BusinessData.isAdd = false;
      this.SaveAPIBody.data.BusinessData.isDelete = true;
      this.fillBodyData();
      this.onSaveAPICall();
    },
    onEdit() {
      if (this.isFormValid) {
        this.SaveAPIBody.data.BusinessData.customer_id = this.customer_id;
        this.SaveAPIBody.data.BusinessData.isOld = true;
        this.SaveAPIBody.data.BusinessData.isAdd = false;
        this.SaveAPIBody.data.BusinessData.isDelete = false;
        this.fillBodyData();
        this.onSaveAPICall();
      } else {
        this.$root.$snackbar.seterrortext(
          "Please fill all the required fields"
        );
      }
    },
    fillBodyData() {
      this.SaveAPIBody.data.UserId = this.userId;
      this.SaveAPIBody.data.BranchId = this.branchId;
      this.SaveAPIBody.data.BusinessData.customer_name = this.customer_name;
      this.SaveAPIBody.data.BusinessData.father_name = this.father_name;
      this.SaveAPIBody.data.BusinessData.mother_name = this.mother_name;
      this.SaveAPIBody.data.BusinessData.gender = this.gender;
      this.SaveAPIBody.data.BusinessData.date_of_birth = this.date_of_birth;
      this.SaveAPIBody.data.BusinessData.marital_status = this.marital_status;
      this.SaveAPIBody.data.BusinessData.spouse_name = this.spouse_name;
      this.SaveAPIBody.data.BusinessData.nid = this.nid;

      if (this.isNew && !this.isOld) {
        this.SaveAPIBody.data.BusinessData.MAKE_BY = this.userId;
        this.SaveAPIBody.data.BusinessData.MAKE_DT = this.transDate;
        this.SaveAPIBody.data.BusinessData.LAST_ACTION = "ADD";
      } else if (!this.isNew && this.isOld) {
        this.SaveAPIBody.data.BusinessData.LAST_ACTION = "EDT";
      }
    },
    onRefresh() {
      this.$refs.customerForm.reset();
      this.customerModal = false;
      this.isNew = true;
      this.isOld = false;
      this.isDelete = false;
    },
    closecustomerModal(value) {
      this.customerModal = value;
    },
    onExit() {
      this.$router.push({ path: "/home" });
    },
    onView() {
      this.customerModal = true;
    },
  },
};
</script>
    
<style scoped>
.v-card {
  margin-top: 0%;
}
</style>



