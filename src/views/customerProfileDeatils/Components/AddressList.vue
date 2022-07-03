<template>
  <div>
    <v-card>
      <v-card-title>Address List</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="6">
            <v-autocomplete
              clearable
              persistent-hint
              :items="addressTypeList"
              item-text="addressTypeText"
              item-value="addressTypeValue"
              label="Address Type"
              v-model="addressData.addr_type_id"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field label="Address" v-model="addressData.address">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-text-field
              label="City/Town/Area"
              v-model="addressData.city"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" sm="6">
            <v-text-field
              label="Zip/Postal Code"
              v-model="addressData.zip_code"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-autocomplete
              clearable
              persistent-hint
              :items="countryList"
              item-text="label"
              item-value="value"
              label="Country"
              v-model="addressData.country_id"
              @change="getDivisionList()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-autocomplete
              clearable
              persistent-hint
              :items="divisionList"
              item-text="label"
              item-value="value"
              label="Division/State"
              v-model="addressData.division_id"
              @change="getDistrictList()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-autocomplete
              clearable
              persistent-hint
              :items="districtList"
              item-text="label"
              item-value="value"
              label="District"
              v-model="addressData.district_id"
              @change="getThanaList()"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" sm="6">
            <v-autocomplete
              clearable
              persistent-hint
              :items="thanaList"
              item-text="label"
              item-value="value"
              label="Thana"
              v-model="addressData.thana_id"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Phone No"
                  v-model="addressData.phone"
                  :rules="[elementaryRules.maxLengthWithoutRequired(200)]"
                ></v-text-field>
              </template>
              <span>Maximum Length 200</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Mobile No"
                  v-model="addressData.mobile"
                  :rules="[elementaryRules.maxLengthWithoutRequired(200)]"
                ></v-text-field>
              </template>
              <span>Maximum Length 200</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Email"
                  v-model="addressData.email"
                  :rules="[elementaryRules.maxLengthWithoutRequired(200)]"
                ></v-text-field>
              </template>
              <span>Maximum Length 200</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-btn @click="addToList" class="v-btn-search"> ADD </v-btn>
          </v-col>
        </v-row>
<br/>
<br/>

        <v-row>
          <v-col cols="12" md="12">
            
            <v-data-table
              :hidden="customerprofiledata.List_Customer_Address.length === 0"
              :headers="headers"
              :items="customerprofiledata.List_Customer_Address"
              :items-per-page="10"
              class="elevation-1"
              dense
            >
              <template v-slot:[`item.ACTIONS`]="{ item }">
                <v-btn
                  small
                  class="btn-bg-green my-auto"
                  @click="editItem(item)"
                >
                  edit
                </v-btn>
                <v-btn
                  small
                  class="btn-bg-red ml-2 my-auto"
                  @click="deleteItem(item)"
                >
                 {{btnremove}}
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <br />
        <br />
        <br />
        <br />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
var headersData = [
  {
    text: "",
    value: "ACTIONS",
  },
  {
    text: "Address Type",
    value: "addr_type",
  },
  {
    text: "Address",
    value: "address",
  },

  {
    text: "City/Town/Area",
    value: "city",
  },
  {
    text: "ZIP/Postal Code",
    value: "zip_code",
  },
  {
    text: "Country",
    value: "country_nm",
  },
  {
    text: "Division/State",
    value: "division_nm",
  },
  {
    text: "District",
    value: "district_nm",
  },
  {
    text: "P.S.",
    value: "thana_nm",
  },
  {
    text: "Land Phone",
    value: "phone",
  },
  {
    text: "Mobile",
    value: "mobile",
  },

  {
    text: "Email",
    value: "email",
  },
];

import { elementaryRules, compositeRules } from "@/rules/rules.js";

export default {
  components: {
    
    
  },
  data() {
    return {
      tableData: [],
btnremove:"remove",
      //=============
      elementaryRules: elementaryRules,
      compositeRules: compositeRules,
      headers: headersData,
      edit: false,
      valid: false,
      addressData: {
        addr_type_id: "",
        customer_id: "",
        address: "",
        city: "",
        zip_code: "",
        country_id: "",
        division_id: "",
        district_id: "",
        thana_id: "",
        phone: "",
        mobile: "",
        email: "",
      },
      countryList: [],
      divisionList: [],
      districtList: [],
      thanaList: [],

      addressTypeList: [
        {
          addressTypeText: "Present Address",
          addressTypeValue: "01",
        },
        {
          addressTypeText: "Permanent Address",
          addressTypeValue: "02",
        },
      ],
    };
  },
  methods: {
    addToList() {
      //create object to push into table
      const data_object = {
        customer_id: this.customerprofiledata.customer_id,
        addr_type_id: this.addressData.addr_type_id,
        addr_type: this.addressType,
        address: this.addressData.address,
        city: this.addressData.city,
        zip_code: this.addressData.zip_code,
        country_id: this.addressData.country_id,
        country_nm: this.countryName,
        division_id: this.addressData.division_id,
        division_nm: this.divisionName,
        district_id: this.addressData.district_id,
        district_nm: this.districtName,
        thana_id: this.addressData.thana_id,
        thana_nm: this.thanaName,
        //THANA_LGID: this.addressData.thanaLgid,
        //COUNTRY: null,
        phone: this.addressData.phone,
        mobile: this.addressData.mobile,
        email: this.addressData.email,

        isAdd: true,
        isDelete: false,
        isOld: false,
      };
      if (this.addressTypeExists) {
        if (this.edit) {
          const addressIndex =
            this.customerprofiledata.List_Customer_Address.findIndex(
              (item) => item.addr_type_id === this.addressData.addr_type_id
            );
          this.customerprofiledata.List_Customer_Address.splice(//what does splice mean over here
            addressIndex,
            1,
            data_object
          );

          this.resetForm();
          this.edit = false;
        } else {
          // show dialog
          alert("Address type exists");

          this.resetForm();
        }
      } else {
        this.customerprofiledata.List_Customer_Address.push(data_object);
        this.resetForm();
      }
    },
    editItem(item) {
      this.edit = true;
      (this.addressData.addr_type_id = item.addr_type_id),
        (this.addressData.address = item.address),
        (this.addressData.city = item.city),
        (this.addressData.zip_code = item.zip_code),
        (this.addressData.country_id = item.country_id),
        (this.addressData.division_id = item.division_id),
        (this.addressData.district_id = item.district_id),
        (this.addressData.thana_id = item.thana_id),
        (this.addressData.phone = item.phone),
        (this.addressData.mobile = item.mobile),
        (this.addressData.email = item.email),
        this.getDivisionList();
      this.getDistrictList();
      this.getThanaList();
    },

    deleteItem(item) {
      const proceed = confirm("Confirm remove?");
      if (proceed) {
        const addressIndex =
          this.customerprofiledata.List_Customer_Address.findIndex(
            (obj) => obj.addr_type_id === item.addr_type_id
          );
        this.customerprofiledata.List_Customer_Address[
          addressIndex
        ].isDelete = true;
        this.customerprofiledata.List_Customer_Address[
          addressIndex
        ].isOld = true;
        this.customerprofiledata.List_Customer_Address[
          addressIndex
        ].isAdd = false;
        //this.btnremove ="Removed";
        this.customerprofiledata.List_Customer_Address.splice(addressIndex, 1);
      }
    },
    resetForm() {
      // resetting all properties to null
      for (let key in this.addressData) {
        this.addressData[key] = null;
      }
      // Wait until the models are updated in the UI
      this.$nextTick(() => {
        //this.$refs.address_form.reset();
        this.$refs.customerForm.reset();
      });
    },
    //can you please explain how the api works, where is the list of countries saved?
    async getCountryList() {
      const businessData = {
        customer_id: this.customer_id,
      };
      const response = await this.$getApiCall(
        "testproject",
        "CustomerAddress/GetCountryDDL",
        businessData
      );
      if (
        response !== null &&
        response !== undefined &&
        response.length !== 0
      ) {
        this.countryList = response;
      } else {
        this.$root.$snackbar.seterrortext("Country Not Found!");
      }
    },

    async getDivisionList() {
      debugger;
      const businessData = {
        country_id: this.addressData.country_id,
      };
      const response = await this.$getApiCall(
        "testproject",
        "CustomerAddress/GetDivisionDDL",
        businessData
      );
      if (
        response !== null &&
        response !== undefined &&
        response.length !== 0
      ) {
        this.divisionList = response;
      } else {
        this.$root.$snackbar.seterrortext("Division Not Found!");
      }
    },
    async getDistrictList() {
      debugger;
      const businessData = {
        division_id: this.addressData.division_id,
      };
      const response = await this.$getApiCall(
        "testproject",
        "CustomerAddress/GetDistrictDDL",
        businessData
      );
      if (
        response !== null &&
        response !== undefined &&
        response.length !== 0
      ) {
        this.districtList = response;
      } else {
        this.$root.$snackbar.seterrortext("District Not Found!");
      }
    },
    async getThanaList() {
      debugger;
      const businessData = {
        district_id: this.addressData.district_id,
      };
      const response = await this.$getApiCall(
        "testproject",
        "CustomerAddress/GetThanaDDL",
        businessData
      );
      if (
        response !== null &&
        response !== undefined &&
        response.length !== 0
      ) {
        this.thanaList = response;
      } else {
        this.$root.$snackbar.seterrortext("Thana Not Found!");
      }
    },
  },
  created() {
    this.getCountryList();
  },
  computed: {
    isRefresh() {
      return this.$store.state.customerpfoile.isRefresh;
    },
    customerprofiledata: {
      get() {
        return this.$store.state.customerpfoile.customerprofileinfo;
      },
    },
    addressType() {
      const addressType = this.addressTypeList.find(
        (item) => item.addressTypeValue === this.addressData.addr_type_id
      );
      return addressType.addressTypeText;
    },

    // get country name by country Id
    countryName() {
      const countryName = this.countryList.find(
        (item) => item.value === this.addressData.country_id
      );
      return countryName.label;
    },
    // get division name by division Id
    divisionName() {
      const divisionName = this.divisionList.find(
        (item) => item.value === this.addressData.division_id
      );
      return divisionName.label;
    },
    // get district name by district Id
    districtName() {
      const districtName = this.districtList.find(
        (item) => item.value === this.addressData.district_id
      );
      return districtName.label;
    },
    // get thana name by thana Id
    thanaName() {
      const thanaName = this.thanaList.find(
        (item) => item.value === this.addressData.thana_id
      );
      return thanaName.label;
    },
    addressTypeExists() {
      if (this.customerprofiledata.List_Customer_Address.length === 0) {
        return false;
      } else {
        const index = this.customerprofiledata.List_Customer_Address.findIndex(
          (item) => item.addr_type_id === this.addressData.addr_type_id
        );
        if (index !== -1) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    isRefresh() {
      // if ("address_form" in this.$refs) this.$refs.address_form.reset();
      this.$nextTick(() => {
        //this.$refs.address_form.reset();
        this.customerprofiledata.List_Customer_Address = [];
      });
    },
    customerprofiledata: {
      deep: true,
      handler(newVal) {
        this.$store.commit("setcustomerprofileinfo", newVal);
      },
    },
  },
};
</script>