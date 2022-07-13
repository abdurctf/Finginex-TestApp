<template>
  <base-material-card>
  <!--why write template again?  for the v-0slot-->
  <template v-slot:heading>
    <v-row class="row-page-header-margin">
    <v-col cols="12" md="4" class="headline">Customer Page</v-col>
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
      >
      <!--what does it mean to write button-component-editview over here?-->
      </button-component-editview>
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
      >

      </button-component-text>

    </v-col>
  </v-row>
  </template>
<br />
<br />

<v-container>
  <base-material-card>
  <template v-slot:heading>
    <div class="display-2 font-weight-light head">
      Customer Profile Details
    </div>
  </template>

  <v-card flat>
          <v-form ref="customerForm" v-model="isFormValid">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-tooltip top nudge-bottom="30" nudge-right="50">
                    <template v-slot:activator="{ on, attrs }">
                    <!--what does the maxlengthrequired(3)mean?-->
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
                        v-model="customerprofiledata.customer_id"
                       
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
                        v-model="customerprofiledata.customer_name"
                        :rules="[
                          ...elementaryRules.required,
                          ...elementaryRules.maxLength(100),
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
                        v-model="customerprofiledata.father_name"
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
            v-model="customerprofiledata.mother_name"
            :rules="[...elementaryRules.required,
                          ...elementaryRules.maxLength(50),
                        ]"
            ></v-text-field>
            </template>
            <span>Maximum Length 50</span>
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
          v-model="customerprofiledata.gender">
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <DatePickerWithText
          v-model="customerprofiledata.date_of_birth"
          dateLabel="Date of Birth"
          :requiredRules="false"/>
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
                    v-model="customerprofiledata.marital_status"
                  >
                  </v-autocomplete>
        </v-col>
      </v-row>
      <br />
    <v-row>
      <!--what is the benefit of starting with v-row tag ?-->
                <v-col cols="12" sm="6" md="4">
                  <v-tooltip top nudge-bottom="30" nudge-right="50">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        label="Spouse Name"
                        v-model="customerprofiledata.spouse_name"
                        :rules="[...elementaryRules.required,
                          ...elementaryRules.maxLength(50),
                        ]"
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
                        v-model="customerprofiledata.nid"
                        :rules="[elementaryRules.maxLengthWithoutRequired(13)]"
                      ></v-text-field>
                    </template>
                    <span>Maximum Length 13</span>
                 </v-tooltip>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>

        <v-card>
          <v-tabs
            v-model="tab"
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
            background-color="rgb(63, 77, 103)"
            dark
          >
            <v-tab :key="IntroducerInfoTab"> Introducer Info </v-tab>

            <v-tab :key="AddressListTab"> Address List </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :key="IntroducerInfoTab">
              <v-card flat>
                <v-card-text>
                  <IntroducerInfo />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="AddressListTab">
              <v-card flat>
                <v-card-text>
                  <AddressList />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </base-material-card>
    </v-container>
  </base-material-card>
</template>



<script>
import ViewOKButton from "@/components/ViewOKButton.vue";
import EditDeleteViewButton from "@/components/EditDeleteViewButton.vue";
import { elementaryRules, compositeRules } from "@/rules/rules.js";
import IntroducerInfo from "./Components/IntroducerInfo";
import AddressList from "./Components/AddressList";
import { Get_Padded_Customer_Id } from "@/js/commonMethods.js";

export default {
  name: "customerProfileDeatilsUI",
  components: {
    "button-component-text": ViewOKButton,
    "button-component-editview": EditDeleteViewButton,
    IntroducerInfo,
    AddressList,
    
},
  data() {
    return {
      userId: "shafique",
      branchId: "0031",
      branchName: "",
      isFormValid: false,
      elementaryRules: elementaryRules,//why are we writing this? for using them in the template
      compositeRules: compositeRules,
      Get_Padded_Customer_Id: Get_Padded_Customer_Id,
      transDate: new Date(),
      isOld: false,
      isNew: true,//why is one set true whereas the other false//default conditions applicable for this program
      IntroducerInfoTab:'IntroducerInfoTab',
      AddressListTab:'AddressListTab',

      tab: null, //whats a tab
      customerModal: false,
      genderList: [
        {
          gender_value: "M",
          gender_text:"Male",
        },
        {
          gender_value:"F",
          gender_text:"Female",
        },
        {
          gender_value:"X",
          gender_text:"Other",
        },
      ],
      marital_status_list:[
        {marital_status_text: "Married",
        marital_status_value: "M",
        },
        {marital_status_text:"Unmarried",
        marital_status_value: "U",
        },
      ],
    
    };
  },
  created(){
    const businessData={
      nameValueList: "0", //what does it mean as a 0? and why is it a const?
    };
  },
  mounted() {}, //why is mounted empty?
  methods: {
    oncustomeridDblClick() {//but we do not dbl click on anything!!!
      this.customerModal=true;
    },
    //I did not understand from this part till async on saveapicall
    async onIDChange(){
      if(this.stringIsEmptyOrNullCheck(this.customerprofiledata.customer_id)){
        return;
      }else{
         this.GetCustomerProfileDetailsById();
      }
      },
      async GetCustomerProfileDetailsById(){
        debugger;
        const businessData={
          customer_id: Get_Padded_Customer_Id(
            this.customerprofiledata.customer_id
          ),
        };
        const customerResponse = await this.$getApiCall(
          "testproject",
          "CustomerProfile/GetCustomerProfileDetailsById",
          businessData
        );
        if(
        customerResponse !== null &&
        customerResponse !== undefined &&
        customerResponse.length !== 0
      ) {
        
        this.$store.commit("setcustomerprofileinfo", customerResponse);
        this.isOld = true;
        this.isNew = false;
        this.customerprofiledata.isAdd = false;
        this.customerprofiledata.isOld = true;
        this.customerprofiledata.last_action = "EDT";
      } else {
        this.onRefresh();
        this.$root.$snackbar.seterrortext("Customer Not Found!");
      }
    },
    setSelectedTableItem(selectedItem) {
      this.customerprofiledata.customer_id = selectedItem.customer_id;
      this.GetCustomerProfileDetailsById();
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
      if (this.stringIsEmptyOrNullCheck(this.customerprofiledata.nid)) {
        str = str + "'NID is Required' \n";
      }
      if (this.stringIsEmptyOrNullCheck(this.customerprofiledata.gender)) {
        str = str + "'Gender is Required' ";
      }
      return str;
    },
    async onSaveAPICall() {
      const response = await this.$postApiCall(
        "testproject",
        "CustomerProfile/SaveCustomerProfileWithDetails",

        //should we add about the customer address saving over here too?
        this.customerprofiledata
      );
      if (response.status) {
        this.onRefresh();

      }
    },
        
  onSave() {
      debugger;
      var str = this.checkValidations();
      if (this.stringIsEmptyOrNullCheck(str)) {
        if (this.isFormValid) {
          this.customerprofiledata.isAdd = true;
          this.customerprofiledata.isOld = false;
          this.customerprofiledata.isDelete = false;
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
      this.customerprofiledata.isAdd = false;
      this.customerprofiledata.isOld = true;
      this.customerprofiledata.isDelete = true;
      this.onSaveAPICall();
    },
    onEdit() {
      if (this.isFormValid) {
        debugger
        this.customerprofiledata.isAdd = false;
        this.customerprofiledata.isOld = true;
        this.customerprofiledata.isDelete = false;
        this.onSaveAPICall();
      } else {
        this.$root.$snackbar.seterrortext(
          "Please fill all the required fields"
        );
      }
    },
    onRefresh() {
      this.$store.commit("resetcustomerprofileinfo");
      //this.router.go is what causes the page to reload on refresh
      this.$router.go();      
      this.$refs.customerForm.reset();
      this.customerModal = false;
      this.isNew = true;
      this.isOld = false;
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

    computed: {
      customerprofiledata:{//what are we computing here?
        get(){
          return this.$store.state.customerpfoile.customerprofileinfo;
        },
      },
    },
    watch: {
      customerprofiledata: {
        deep: true,
        handler(newValue) {//why are we using watchers here?
        //debugger
          this.$store.commit("setcustomerprofileinfo", newValue);
        },
      },
    },
};

</script>


<style scoped>
.v-card {
  margin-top: 0%;
}
</style>
