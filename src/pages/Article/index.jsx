import ErrorMsg from '@/components/ErrorMsg';

const Index = (props) => {
  return <div>

    <ErrorMsg
      msg={null}
    />

    id: {props?.match?.params?.id}
  </div>
}



export default Index;
