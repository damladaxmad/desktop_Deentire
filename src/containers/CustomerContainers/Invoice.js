import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // Styles for the invoice layout
  // ... (same styles as before)
});

const generateInvoicePDF = () => {
  const companyInfo = {
    companyName: 'Your Company Name',
    address: '123 Street, City, Country',
    // Add more company details as needed
  };

  const items = [
    { name: 'Item 1', quantity: 2, price: 10 },
    { name: 'Item 2', quantity: 1, price: 20 },
    // Add more items as needed
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
          <Text>{companyInfo.companyName}</Text>
          <Text>{companyInfo.address}</Text>
          {/* Add more company details as needed */}
        </View>

        {/* Invoice Items */}
        <View style={styles.itemsTable}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Item</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Quantity</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Price</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Total</Text>
          </View>

          {/* Table Rows */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.quantity * item.price}</Text>
            </View>
          ))}

          {/* Total Row */}
          <View style={styles.totalRow}>
            <Text style={[styles.tableCell, styles.totalLabel]}>Total:</Text>
            <Text>{calculateTotal(items)}</Text>
          </View>
        </View>

        {/* Rest of the invoice content */}
        {/* Add more sections for billing details, terms, etc. */}
        {/* Example:
        <View style={styles.additionalSection}>
          <Text>Billing Details:</Text>
          <Text>Recipient:</Text>
          <Text>Terms and Conditions:</Text>
          {/* Add more content as needed */}
        {/* </View> */}
      </Page>
    </Document>
  );
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

const Invoice = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      {generateInvoicePDF()}
    </PDFViewer>
  );
};

export default Invoice;
