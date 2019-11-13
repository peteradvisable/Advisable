import React from "react";
import { find, get } from "lodash";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import { graphql } from "react-apollo";
import { Link, Box, Text } from "@advisable/donut";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Loading from "../../../components/Loading";
import TextField from "../../../components/TextField";
import AddressFields from "../../../components/AddressFields";
import { invoiceSettingsValidation } from "./validationSchema";

export const GET_DATA = gql`
  query invoiceSettings {
    viewer {
      ... on User {
        id
        name
        companyName
        country {
          id
        }
      }
    }
    countries {
      id
      eu
      code
      name
    }
  }
`;

const InvoiceSettings = ({ data, match, setValue, history, values }) => {
  let countries = get(data, "countries", []);

  const initialValues = {
    name: get(values, "invoiceSettings.name", get(data, "viewer.name", "")),
    companyName: get(
      values,
      "invoiceSettings.companyName",
      get(data, "viewer.companyName", "")
    ),
    vatNumber: get(values, "invoiceSettings.vatNumber", ""),
    address: {
      line1: get(values, "invoiceSettings.address.line1", ""),
      line2: get(values, "invoiceSettings.address.line2", ""),
      city: get(values, "invoiceSettings.address.city", ""),
      state: get(values, "invoiceSettings.address.state", ""),
      country: get(
        values,
        "invoiceSettings.address.country",
        get(data, "viewer.country.id")
      ),
      postcode: get(values, "invoiceSettings.address.postcode", ""),
    },
  };

  let hasSelectedEUCountry = formik => {
    const countryValue = formik.values.address.country;
    let country = find(countries, c => {
      return c.code === countryValue || c.name === countryValue;
    });
    if (!country) return false;
    return country.eu;
  };

  const handleSubmit = values => {
    setValue("invoiceSettings", values);
    history.push("payment_terms");
  };

  let applicationId = match.params.applicationId;
  let backURL = `/manage/${applicationId}`;

  if (data.loading) return <Loading />;

  let validationSchema = invoiceSettingsValidation(countries);

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Box p="l">
            <Link mb="m" to={backURL} replace>
              ← Back
            </Link>
            <Text
              pb="xs"
              size="xl"
              lineHeight="s"
              color="blue.8"
              weight="medium"
            >
              Invoice settings
            </Text>
            <Text size="xs" color="neutral.5" lineHeight="xs" mb="l">
              Please provide your details below for invoicing
            </Text>

            <Box mb="s">
              <TextField
                name="name"
                label="Full Name"
                placeholder="Full Name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name}
              />
            </Box>

            <Box mb="s">
              <TextField
                name="companyName"
                label="Company Name"
                placeholder="Company Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.companyName}
                error={formik.touched.companyName && formik.errors.companyName}
              />
            </Box>

            <Box mb="s">
              <AddressFields
                formik={formik}
                name="address"
                label="Company Address"
              />
            </Box>
            {hasSelectedEUCountry(formik) && (
              <Box mb="m">
                <TextField
                  name="vatNumber"
                  label="VAT Number"
                  placeholder="VAT Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.vatNumber}
                  error={formik.touched.vatNumber && formik.errors.vatNumber}
                />
              </Box>
            )}
            <Box pt="s">
              <Button block size="l" styling="primary" type="submit">
                Continue
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default graphql(GET_DATA)(InvoiceSettings);
