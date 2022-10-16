import ErrorMsg from '@/components/ErrorMsg';

const Index = (props) => {
  return <div>

    <ErrorMsg
      msg={null}
    />

    More id: {props?.match?.params?.id}
  </div>
}



export default Index;
