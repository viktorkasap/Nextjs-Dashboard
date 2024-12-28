interface EditInvoiceProps {
  params: Promise<{ id: string }>;
}

export const EditCustomer = async ({ ...props }: EditInvoiceProps) => {
  const { id } = await props.params;

  // eslint-disable-next-line no-console
  console.log('Edit customer:', id);

  return <p>Edit customer</p>;
};
