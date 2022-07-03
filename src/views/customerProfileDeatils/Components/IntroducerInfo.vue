<template>
  <div>
    <v-card>
      <v-card-title>Introducer Information</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              clearable
              persistent-hint
              :items="introduceTypeList"
              item-text="introducerText"
              item-value="introducerValue"
              label="Introducer Type"
              v-model="
                customerprofiledata.Obj_Customer_Introducer.introducer_type
              "
              @change="onIntroducerTypeChange"
            ></v-autocomplete>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-if="
              customerprofiledata.Obj_Customer_Introducer.introducer_type ==
              '01'
            "
          >
           <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind="attrs"
              v-on="on"
              label="Introducer Acc Branch"
              v-model="
                customerprofiledata.Obj_Customer_Introducer
                  .introducer_account_br
              "
            >
            </v-text-field>
             </template>
              <span>Maximum Length 5</span>
            </v-tooltip>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-if="
              customerprofiledata.Obj_Customer_Introducer.introducer_type ==
              '01'
            "
          >
            <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Introducer Acc No"
                  v-model="
                    customerprofiledata.Obj_Customer_Introducer
                      .introducer_account_no
                  "
                  :rules="[elementaryRules.maxLengthWithoutRequired(10)]"
                ></v-text-field>
              </template>
              <span>Maximum Length 40</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-if="
              customerprofiledata.Obj_Customer_Introducer.introducer_type ==
              '02'
            "
          >
            <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Introducer Employee Id"
                  v-model="
                    customerprofiledata.Obj_Customer_Introducer.employee_id
                  "
                  :rules="[elementaryRules.maxLengthWithoutRequired(20)]"
                ></v-text-field>
              </template>
              <span>Maximum Length 20</span>
            </v-tooltip>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-if="
              customerprofiledata.Obj_Customer_Introducer.introducer_type ==
              '02'
            "
          >
            <v-text-field             
              label="Introducer PA No"
              v-model="
                customerprofiledata.Obj_Customer_Introducer.employee_pa_no
              "
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-tooltip top nudge-bottom="30" nudge-right="50">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  label="Introducer Details"
                  v-model="
                    customerprofiledata.Obj_Customer_Introducer
                      .introducer_details
                  "
                  :rules="[elementaryRules.maxLengthWithoutRequired(200)]"
                ></v-text-field>
              </template>
              <span>Maximum Length 200</span>
            </v-tooltip>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { Get_Padded_Customer_Id } from "@/js/commonMethods.js";
import { elementaryRules, compositeRules } from "@/rules/rules.js";
export default {
  props: {
    FunctionNm: {
      type: String,
    },
  },
  components: {
        
  },
  data() {
    return {
      BranchDialog: false,
      ownerShare: "",
      orgTypeList: [],
      Get_Padded_Customer_Id: Get_Padded_Customer_Id,
      elementaryRules: elementaryRules,
      compositeRules: compositeRules,

      introduceTypeList: [
        {
          introducerText: "Account Holder",
          introducerValue: "01",
        },
        {
          introducerText: "Bank Employee with P.A. No",
          introducerValue: "02",
        },
        {
          introducerText: "Peoples Representative",
          introducerValue: "03",
        },
        {
          introducerText: "Respective Person of the Local Area",
          introducerValue: "04",
        },
      ],
    };
  },
  methods: {
    onIntroducerTypeChange() {
      debugger;
      var selectedItem = this.customerprofiledata.introducer_id;
      if (selectedItem == "01") {
      } else if (selectedItem == "02") {
      } else if (selectedItem == "03") {
      } else if (selectedItem == "04") {
      }
    },
  },

  async created() {},

  computed: {
    customerprofiledata: {
      get() {
        return this.$store.state.customerpfoile.customerprofileinfo;
      },
    },
  },
  watch: {
    customerprofiledata: {
      deep: true,
      handler(newVal) {
        this.$store.commit("setcustomerprofileinfo", newVal);
      },
    },
  },
};
</script>